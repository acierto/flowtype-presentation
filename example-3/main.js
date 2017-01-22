/* @flow */
type JSON = | string | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key:string]: JSON };
type JSONArray = Array<JSON>;

function typedJSON(x: mixed): JSON {
  if (typeof x === "object" && x !== null) {
    let o: JSONObject = {};
    for (let k of Object.keys(x)) {
      o[k] = typedJSON(x[k]);
    }
    return o;
  }

  if (Array.isArray(x)) {
    return x.map(typedJSON);
  }

  if (x === null ||
      typeof x === "string" ||
      typeof x === "number" ||
      typeof x === "boolean") {
    return x;
  }

  throw new Error("Invalid JSON");
}

typedJSON(3);