import { app } from './../settings';
import { MongoClient } from "mongodb";
import request from "supertest";
import dotenv from "dotenv";
import { HTTP_STATUS } from "../utils";
import { log } from 'console';
import { runDb, stopDb } from '../db/db';
import { blob } from 'stream/consumers';
import { randomUUID } from 'crypto';
dotenv.config();

const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";

describe("/blogs", () => {

  beforeAll(async () => {
	await runDb()

    const wipeAllRes =  await request(app)
      .delete("/testing/all-data")
	  .send()

	expect(wipeAllRes.status).toBe(HTTP_STATUS.NO_CONTENT_204)

	const getBlogs = await request(app).get("/blogs").send()
	expect(getBlogs.status).toBe(HTTP_STATUS.OK_200)
	expect(getBlogs.body.items).toHaveLength(0)
  });

  afterAll(async () => {
	await stopDb()
  });


  const blogsValidationErrRes = {
	errorsMessages: expect.arrayContaining([
		{
			message: expect.any(String),
			field: 'name'
		},
		{
			message: expect.any(String),
			field: 'description'
		},
		{
			message: expect.any(String),
			field: 'websiteUrl'
		}
	])
}

describe('create blog tests', () => {
	it("create blog without auth => should return 401 status code", async () => {
		const createBlogWithoutHeaders = await request(app).post("/blogs").send({})
		expect(createBlogWithoutHeaders.status).toBe(HTTP_STATUS.NOT_AUTHORIZATION_401)
	  });
	
	  it("create blog with incorrect auth => should return 401 status code", async () => {
		const createBlogWithIncorrectHeaders = await request(app)
		.post("/blogs")
		.auth('123', '456')
		.send({})
		expect(createBlogWithIncorrectHeaders.status).toBe(HTTP_STATUS.NOT_AUTHORIZATION_401)
	  });
	
	  it("create blog with correct auth => should not return 401 status code", async () => {
		const createBlogWithCorrectHeaders = await request(app)
		.post("/blogs")
		.auth('admin', 'qwerty')
		.send({})
	
		expect(createBlogWithCorrectHeaders.status).not.toBe(HTTP_STATUS.NOT_AUTHORIZATION_401)
	  });
	
	  it("create blog with empty body => should return 400 status code and errorsMessages", async () => {
		const createBlogWithEmptyBody = await request(app)
		.post("/blogs")
		.auth('admin', 'qwerty')
		.send({})
	
		expect(createBlogWithEmptyBody.status).toBe(HTTP_STATUS.BAD_REQUEST_400)
		expect(createBlogWithEmptyBody.body).toStrictEqual(blogsValidationErrRes)
	  });
	
	
	  it("create blog with incorrect body => should return 400 status code and errorsMessages", async () => {
		const createBlogWithIncorrectBody = await request(app)
		.post("/blogs")
		.auth('admin', 'qwerty')
		.send({
			name: 123,
			description: true,
			websiteUrl: randomUUID()
		})
	
		expect(createBlogWithIncorrectBody.status).toBe(HTTP_STATUS.BAD_REQUEST_400)
		expect(createBlogWithIncorrectBody.body).toStrictEqual(blogsValidationErrRes)
	  });
	
	
	  it("create blog with correct body => should return 201 status code and created blog", async () => {
		const getBlogsBefore = await request(app).get("/blogs").send()
		expect(getBlogsBefore.status).toBe(HTTP_STATUS.OK_200)
		expect(getBlogsBefore.body.items).toHaveLength(0)
	
		const inputData = {
			name: 'name',
			description: 'description',
			websiteUrl: `https://${randomUUID()}.com`
		}
	
		const createBlogWithCorrectBody = await request(app)
		.post("/blogs")
		.auth('admin', 'qwerty')
		.send(inputData)
	
		expect(createBlogWithCorrectBody.status).toBe(HTTP_STATUS.CREATED_201)
		expect(createBlogWithCorrectBody.body).toStrictEqual({
			id: expect.any(String),
			name: inputData.name,
			description: inputData.description,
			websiteUrl: inputData.websiteUrl,
			createdAt: expect.any(String),
			isMembership: false,
		})
	
		const getBlogsAfter = await request(app).get("/blogs").send()
		expect(getBlogsAfter.status).toBe(HTTP_STATUS.OK_200)
		expect(getBlogsAfter.body.items).toHaveLength(1)
	  });
})
  

//   it("should return 404 fro not existing blogs", async () => {
//     await request(blogsRouter).get("/:1").expect(404);
//   });

//   it("shouldn`t create with incorrect input data", async () => {
//     await request(blogsRouter)
//       .post("/:2023-10-13T09:42:46.296Z/posts")
//       .send({ title: "beck-end" })
//       .expect(HTTP_STATUS.NOT_FOUND_404);

//     await request(blogsRouter).get("/");
//     expect(HTTP_STATUS.CREATED_201);
//   });

//   it("should created blogs with correct data", async () => {
//     const createResponse = await request(blogsRouter)
//       .post("/:2023-10-13T09:42:46.296Z/posts")
//       .send({
//         title: "beck-end",
//         shortDescription: "lllllllllllll",
//         content: "bbbbbbbbbbbbb",
//         blogId: "2023-10-13T09:42:46.296Z",
//       })
//       .expect(HTTP_STATUS.NOT_FOUND_404);

//     const createdBlogs = createResponse.body;
//     expect(createdBlogs).toEqual({
//       id: expect.any(Number),
//       title: "beck-end",
//       shortDescription: "lllllllllllll",
//       content: "bbbbbbbbbbbbb",
//       blogId: "2023-10-13T09:42:46.296Z",
//     });

//     await request(blogsRouter)
//       .get("/")
//       .expect(HTTP_STATUS.CREATED_201, [createdBlogs]);
//   });

//   it("shouldn`t update blogs with incorrect data", async () => {
//     await request(blogsRouter)
//       .put("/:1")
//       .send({
//         id: expect.any(Number),
//         name: "",
//         description: "",
//         websiteUrl: "",
//       })
//       .expect(HTTP_STATUS.NOT_FOUND_404);
//   });
});
