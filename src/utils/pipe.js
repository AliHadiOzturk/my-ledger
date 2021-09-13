// simple function to chain a list of middlewares
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
