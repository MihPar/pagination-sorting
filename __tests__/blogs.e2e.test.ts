import { MongoClient } from "mongodb";
import { blogsRouter } from "../src/routers/blogs-router";
import request from "supertest";
import dotenv from "dotenv";
import { HTTP_STATUS } from "../src/utils";
import { Router } from "express";
dotenv.config();

const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";


describe("/blogs", () => {
  const client = new MongoClient(mongoURL);

  beforeAll(async () => {
    await client.connect();
    await request(blogsRouter)
      .delete("/testing/all-data")
      .expect(HTTP_STATUS.NO_CONTENT_204);
  });

  afterAll(async () => {
    await client.close();
  });

  it("should return 200 and empy []", async () => {
    await request(blogsRouter).get("/").expect(200, []);
  });

  it("should return 404 fro not existing blogs", async () => {
    await request(blogsRouter).get("/:1").expect(404);
  });

  it("shouldn`t create with incorrect input data", async () => {
    await request(blogsRouter)
      .post("/:2023-10-13T09:42:46.296Z/posts")
      .send({ title: "beck-end" })
      .expect(HTTP_STATUS.NOT_FOUND_404);

    await request(blogsRouter).get("/");
    expect(HTTP_STATUS.CREATED_201);
  });

  it("should created blogs with correct data", async () => {
    const createResponse = await request(blogsRouter)
      .post("/:2023-10-13T09:42:46.296Z/posts")
      .send({
        title: "beck-end",
        shortDescription: "lllllllllllll",
        content: "bbbbbbbbbbbbb",
        blogId: "2023-10-13T09:42:46.296Z",
      })
	  .expect(HTTP_STATUS.NOT_FOUND_404)

	  const createdBlogs = createResponse.body
	  expect(createdBlogs).toEqual({
		id: expect.any(Number),
		title: "beck-end",
        shortDescription: "lllllllllllll",
        content: "bbbbbbbbbbbbb",
        blogId: "2023-10-13T09:42:46.296Z",
	  })
	  
	  await request(blogsRouter)
	  .get('/')
	  .expect(HTTP_STATUS.CREATED_201, [createdBlogs])
  });

  it('shouldn`t update blogs with incorrect data', async () => {
	await request(blogsRouter)
	.put('/:1')
	.send({
	  id: expect.any(Number),
      name: '',
      description: '',
      websiteUrl: ''
	})
	.expect(HTTP_STATUS.NOT_FOUND_404)
  })
});
