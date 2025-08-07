import chalk from "chalk";

export const handleError = (res, status, message = "") => {
  console.log(chalk.redBright.bold(message, status));
  return res.status(status).json(message);
};
