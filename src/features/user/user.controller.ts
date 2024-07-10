import { Controller, Get, Post } from "@nestjs/common";

@Controller("users")
export class UserController {
    @Get()
    getUsers() {}

    @Post()
    createUser() {}
}