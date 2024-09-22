import { Op as SeqOp } from 'sequelize';

export enum Operations {
  contains = 'contains',
  startsWith = 'startsWith',
  endsWith = 'endsWith',
  notContains = 'notLike',

  gt = 'gt',
  lt = 'lt',
  gte = 'gte',
  lte = 'lte',
  equals = 'eq',
  notEquals = 'ne',
  in = 'in',
  notIn = 'notIn',
  between = 'between',
  notBetween = 'notBetween',

  and = 'and',
  or = 'or',
}

export enum StringOperations {
  contains = Operations.contains,
  startsWith = Operations.startsWith,
  endsWith = Operations.endsWith,
  notContains = Operations.notContains,
  equals = Operations.equals,
  notEquals = Operations.notEquals,
  in = Operations.in,
  notIn = Operations.notIn,
}

export enum NumberOperations {
  gt = Operations.gt,
  lt = Operations.lt,
  gte = Operations.gte,
  lte = Operations.lte,
  equals = Operations.equals,
  notEquals = Operations.notEquals,
  in = Operations.in,
  notIn = Operations.notIn,
  between = Operations.between,
  notBetween = Operations.notBetween,
}

export enum DateOperations {
  gt = Operations.gt,
  lt = Operations.lt,
  gte = Operations.gte,
  lte = Operations.lte,
  equals = Operations.equals,
  notEquals = Operations.notEquals,
  in = Operations.in,
  notIn = Operations.notIn,
  between = Operations.between,
  notBetween = Operations.notBetween,
}

export enum BooleanOperations {
  equals = Operations.equals,
  notEquals = Operations.notEquals,
}

export enum LogicOperations {
  and = Operations.and,
  or = Operations.or,
}

export const arrayOperators: string[] = [
  NumberOperations.in,
  NumberOperations.notIn,
  NumberOperations.between,
  NumberOperations.notBetween,
];

export const Op = {
  [Operations.contains]: SeqOp.like,
  [Operations.startsWith]: SeqOp.startsWith,
  [Operations.endsWith]: SeqOp.endsWith,
  [Operations.notContains]: SeqOp.notLike,

  [Operations.gt]: SeqOp.gt,
  [Operations.lt]: SeqOp.lt,
  [Operations.gte]: SeqOp.gte,
  [Operations.lte]: SeqOp.lte,

  [Operations.equals]: SeqOp.eq,
  [Operations.notEquals]: SeqOp.ne,
  [Operations.in]: SeqOp.in,
  [Operations.notIn]: SeqOp.notIn,
  [Operations.between]: SeqOp.between,
  [Operations.notBetween]: SeqOp.notBetween,

  [Operations.and]: SeqOp.and,
  [Operations.or]: SeqOp.or,
};

export function includeOperator(included: string, operatorList: Operations[]) {
  return (operatorList as string[]).includes(included);
}
