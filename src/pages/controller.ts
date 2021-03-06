// src/pages/controller.ts
import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  Post,
  HttpCode,
  NotFoundError,
  Authorized
} from "routing-controllers";
import Page from "./entity";

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  getPage(@Param("id") id: number) {
    return Page.findOne(id);
  }
  @Get("/pages")
  async allPages() {
    const pages = await Page.find();
    return { pages };
  }
  @Put("/pages/:id")
  async updatePage(@Param("id") id: number, @Body() update: Partial<Page>) {
    const page = await Page.findOne(id);
    if (!page) throw new NotFoundError("Cannot find page");
    return Page.merge(page, update).save();
  }
  @Authorized()
  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() page: Page) {
    return page.save();
  }
}
