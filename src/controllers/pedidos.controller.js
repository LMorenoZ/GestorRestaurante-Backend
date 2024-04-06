import { pool } from '../db.js';

export const getPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};

export const getPedido = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM pedidos WHERE PedidoID = ?',
      [req.params.id]
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: 'Pedido no encontrado',
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};

export const createPedidos = async (req, res) => {
  try {
    const { UserID, Descripcion, Estado } = req.body;
    const [rows] = await pool.query(
      'INSERT INTO pedidos(UserID,Descripcion,Estado) VALUES (?,?,?)',
      [UserID, Descripcion, Estado]
    );
    res.send({
      id: rows.insertId,
      UserID,
      Descripcion,
      Estado,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};

export const updatePedidos = async (req, res) => {
  try {
    const { id } = req.params;
    const { UserID, Descripcion, Estado } = req.body;

    const [result] = await pool.query(
      'UPDATE pedidos SET UserID = IFNULL(?,UserID),Descripcion= IFNULL(?,Descripcion),Estado= IFNULL(?,Estado) WHERE PedidoID  = ?',
      [UserID, Descripcion, Estado, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Pedido no encontrado',
      });

    const [rows] = await pool.query(
      'SELECT * FROM pedidos WHERE PedidoID  = ?',
      [id]
    );

    res.json(rows[0]);
    console.log(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};

export const deletePedidos = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM pedidos WHERE PedidoID = ?',
      [req.params.id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: 'Pedido no encontrado',
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};
