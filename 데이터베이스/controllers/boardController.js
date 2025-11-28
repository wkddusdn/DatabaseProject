const boardModel = require('../models/boardModel');

// 목록
exports.list = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const search = req.query.search || "";

    const { list, total } = await boardModel.getList(page, limit, search);
    const totalPage = Math.ceil(total / limit);

    res.render('list', { list, page, totalPage, search });
};

// 상세보기
exports.view = async (req, res) => {
    const id = req.params.id;
    const post = await boardModel.getView(id);
    res.render('view', { post });
};

// 글쓰기
exports.writeForm = (req, res) => {
    res.render('write');
};

exports.write = async (req, res) => {
    await boardModel.create(req.body);
    res.redirect('/');
};

// 수정
exports.editForm = async (req, res) => {
    const post = await boardModel.getView(req.params.id);
    res.render('edit', { post });
};

exports.edit = async (req, res) => {
    await boardModel.update(req.params.id, req.body);
    res.redirect('/');
};

// 삭제
exports.delete = async (req, res) => {
    await boardModel.delete(req.params.id);
    res.redirect('/');
};
