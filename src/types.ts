import { Request } from "express";

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;
export type RequestWithParamsAndQuery<T, Q> = Request<T, {}, {}, Q>;

export type PaginationType<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};

export type BlogsType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export type PostsType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export type DBUserType = {
  _id: any;
} & UserGeneralType;

export type UserGeneralType = {
  login: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type UserType = {
  id: any;
  login: string;
  email: string;
  createdAt: string;
};
