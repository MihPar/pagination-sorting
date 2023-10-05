import { blogsQueryRepositories } from './../repositories/blogs-query-repositories';
import {body} from 'express-validator'


export const inputPostTitleValidator = body('title')
.isString()
.notEmpty()
.trim()
.isLength({min: 1, max: 30})
.withMessage('Name should be length from 1 to 30 symbols')

export const inputPostShortDescriptionValidator = body('shortDescription')
.isString()
.notEmpty()
.trim()
.isLength({min: 1, max: 500})
.withMessage('Descriptionme should be length from 1 to 500 symbols')

export const inputPostContentValidator = body('content')
.isString()
.trim()
.notEmpty()
.custom(async (id) => {
    const blogExist = await blogsQueryRepositories.findBlogById(id);
    if (!blogExist) {
      throw new Error("Blog is not exists");
    }
    return true;
  }).withMessage('Descriptionme should be length from 1 to 100 symbols')
  