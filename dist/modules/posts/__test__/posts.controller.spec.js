"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _postscontroller = require("../posts.controller");
describe('PostsController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _postscontroller.PostsController
            ]
        }).compile();
        controller = module.get(_postscontroller.PostsController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});
