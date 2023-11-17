import dayjs from "dayjs";

export type Commit = {
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};
export type CommitsByDate = { [date: string]: Commit[] };

const types = {
  add: "additions" as const,
  remove: "removals" as const,
  changes: "changes" as const,
  other: "other" as const,
};

type ValueOf<T> = T[keyof T];

export type CommitsByType = {
  [key in ValueOf<typeof types>]: Commit[];
};

export type CommitsByDateAndType = {
  [date: string]: CommitsByType;
};

async function getCommitsFromGithub() {
  const commits = await fetch(
    "https://api.github.com/repos/br-dev-org/site/commits",
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + import.meta.env.GITHUB_TOKEN,
      },
    }
  ).then<Commit[]>((response) => response.json());

  if (!Array.isArray(commits)) {
    console.error("Something went wrong on fetching commits", commits);
    return [];
  }

  return commits;
}

export async function getCommitListOrganizedByDateAndType(): Promise<CommitsByDateAndType> {
  const commits = await getCommitsFromGithub();

  const commitsByDate = commits
    .map<Commit & { date: string }>((commit) => ({
      ...commit,
      date: dayjs(commit.commit.author.date).format("YYYY-MM-DD"),
    }))
    .reduce((commitsByDate, commit) => {
      const date = commit.date;

      if (date in commitsByDate) {
        return {
          ...commitsByDate,
          [date]: [...commitsByDate[date], commit],
        };
      }

      return {
        ...commitsByDate,
        [date]: [commit],
      };
    }, {} as CommitsByDate);

  const aggregateByType = (
    type: keyof typeof types,
    commitsByType: CommitsByType,
    commit: Commit
  ) => {
    const message = commit.commit.message;

    if (new RegExp(`^${type}: `).test(message)) {
      return {
        ...commitsByType,
        [types[type]]: [...commitsByType[types[type]], commit],
      };
    }

    return;
  };

  const commitsByDateAndType = Object.keys(commitsByDate).reduce(
    (commitsByDateAndType, date) => ({
      ...commitsByDateAndType,
      [date]: commitsByDate[date].reduce(
        (commitsByType, commit) => {
          for (const type of Object.keys(types)) {
            const item = aggregateByType(
              type as unknown as keyof typeof types,
              commitsByType,
              commit
            );

            if (item) {
              return item;
            }
          }

          return {
            ...commitsByType,
            other: [...commitsByType.other, commit],
          };
        },
        {
          additions: [],
          removals: [],
          changes: [],
          other: [],
        } as CommitsByType
      ),
    }),
    {} as CommitsByDateAndType
  );

  return commitsByDateAndType;
}
