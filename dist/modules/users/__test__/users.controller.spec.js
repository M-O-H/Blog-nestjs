"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _userscontroller = require("../users.controller");
describe('UsersController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _userscontroller.UsersController
            ]
        }).compile();
        controller = module.get(_userscontroller.UsersController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});
