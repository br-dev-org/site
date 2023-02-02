import dayjs from 'dayjs'

export type Commit = {
  commit: {
    message: string
    author: {
      date: string
    }
  }
}
export type CommitsByDate = { [date: string]: Commit[] }
export type CommitsByType = {
  additions: Commit[]
  removals: Commit[]
  changes: Commit[]
  other: Commit[]
}
export type CommitsByDateAndType = {
  [date: string]: CommitsByType
}

async function getCommitsFromGithub() {
  const commits = await fetch(
    'https://api.github.com/repos/br-dev-org/site/commits',
    {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + import.meta.env.GITHUB_TOKEN
      }
    }
  ).then<Commit[]>(response => response.json())

  if (!Array.isArray(commits)) {
    console.error("Something went wrong on fetching commits", commits)
    return []
  }

  return commits
}

export async function getCommitListOrganizedByDateAndType(): Promise<CommitsByDateAndType> {
  const commits = await getCommitsFromGithub()

  const commitsByDate = commits
    .map<Commit & { date: string }>(commit => ({
      ...commit,
      date: dayjs(commit.commit.author.date).format('YYYY-MM-DD')
    }))
    .reduce((commitsByDate, commit) => {
      const date = commit.date

      if (date in commitsByDate) {
        return {
          ...commitsByDate,
          [date]: [...commitsByDate[date], commit]
        }
      }

      return {
        ...commitsByDate,
        [date]: [commit]
      }
    }, {} as CommitsByDate)

  const commitsByDateAndType = Object.keys(commitsByDate).reduce(
    (commitsByDateAndType, date) => ({
      ...commitsByDateAndType,
      [date]: commitsByDate[date].reduce(
        (commitsByType, commit) => {
          const message = commit.commit.message

          if (/^add: /.test(message)) {
            return {
              ...commitsByType,
              additions: [...commitsByType.additions, commit]
            }
          }

          if (/^remove: /.test(message)) {
            return {
              ...commitsByType,
              removals: [...commitsByType.removals, commit]
            }
          }

          if (/^changes*: /.test(message)) {
            return {
              ...commitsByType,
              changes: [...commitsByType.changes, commit]
            }
          }

          return {
            ...commitsByType,
            other: [...commitsByType.other, commit]
          }
        },
        {
          additions: [],
          removals: [],
          changes: [],
          other: []
        } as CommitsByType
      )
    }),
    {} as CommitsByDateAndType
  )

  return commitsByDateAndType
}
