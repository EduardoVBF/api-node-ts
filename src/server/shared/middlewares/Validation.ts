import { StatusCodes } from "http-status-codes";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";
import { RequestHandler } from "express";

type TProperty = "body" | "header" | "query" | "params";

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<Maybe<AnyObject>>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], {
        abortEarly: false,
      });
      // return next();
    } catch (error) {
      const yuperr = error as ValidationError;
      const errors: Record<string, string> = {};

      yuperr.inner.forEach((err) => {
        if (!err.path) return;

        errors[err.path] = err.message;
      });

      errorsResult[key] = errors;

      // return res.status(StatusCodes.BAD_REQUEST).json({
      //   errors,
      // });
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errorsResult,
    });
  }
};
