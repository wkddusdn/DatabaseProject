const db = require('../config/db');

// 게시판 목록 + 검색 + 페이지네이션
exports.getList = async (page, limit, search) => {
    const offset = (page - 1) * limit;

    let query = `SELECT * FROM board`;
    let countQuery = `SELECT COUNT(*) AS cnt FROM board`;

    if (search) {
        query += ` WHERE title LIKE ?`;
        countQuery += ` WHERE title LIKE ?`;
    }

    query += ` ORDER BY id DESC LIMIT ? OFFSET ?`;

    const list = await db.query(query, search ? [`%${search}%`, limit, offset] : [limit, offset]);
    const count = await db.query(countQuery, search ? [`%${search}%`] : []);

    return { list: list[0], total: count[0][0].cnt };
};

// 상세보기
exports.getView = async (id) => {
    await db.query(`UPDATE board SET hit = hit + 1 WHERE id = ?`, [id]);
    const result = await db.query(`SELECT * FROM board WHERE id = ?`, [id]);
    return result[0][0];
};

// 글 작성
exports.create = async (data) => {
    await db.query(
        `INSERT INTO board (title, content, writer) VALUES (?, ?, ?)`,
        [data.title, data.content, data.writer]
    );
};

// 글 수정
exports.update = async (id, data) => {
    await db.query(
        `UPDATE board SET title = ?, content = ?, writer = ? WHERE id = ?`,
        [data.title, data.content, data.writer, id]
    );
};

// 글 삭제
exports.delete = async (id) => {
    await db.query(`DELETE FROM board WHERE id = ?`, [id]);
};
