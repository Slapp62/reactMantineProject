import chalk from "chalk";

export const handleError = (res, stat, message = "") => {
  console.log(chalk.redBright.bold(message));
  return res.status(stat).send(message);
};
