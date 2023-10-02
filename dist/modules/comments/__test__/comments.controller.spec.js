"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _commentscontroller = require("../comments.controller");
describe('CommentsController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _commentscontroller.CommentsController
            ]
        }).compile();
        controller = module.get(_commentscontroller.CommentsController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});
