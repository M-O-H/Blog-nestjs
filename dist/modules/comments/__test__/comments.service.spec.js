"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _commentsservice = require("../comments.service");
describe('CommentsService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _commentsservice.CommentsService
            ]
        }).compile();
        service = module.get(_commentsservice.CommentsService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
