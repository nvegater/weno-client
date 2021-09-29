let inProd = false;

if (process && process.env.NODE_ENV === "production") {
  inProd = true;
}

export { inProd };
