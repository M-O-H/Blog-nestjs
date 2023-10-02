"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _postsservice = require("../posts.service");
describe('PostsService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _postsservice.PostsService
            ]
        }).compile();
        service = module.get(_postsservice.PostsService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
