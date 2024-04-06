import { pool } from '../db.js';

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE UserID = ?', [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};

export const createUsuarios = async (req, res) => {
  try {
    const {
      Nombre,
      Apellido,
      RolID,
      Contraseña,
      Foto,
      Dirección,
      Email,
      Teléfono,
      DUI,
    } = req.body;
    const [rows] = await pool.query(
      'INSERT INTO usuarios(Nombre,Apellido,RolID,Contraseña,Foto,Dirección,Email,Teléfono,DUI) VALUES (?,?,?,?,?,?,?,?,?)',
      [
        Nombre,
        Apellido,
        RolID,
        Contraseña,
        Foto,
        Dirección,
        Email,
        Teléfono,
        DUI,
      ]
    );
    res.send({
      id: rows.insertId,
      Nombre,
      Apellido,
      RolID,
      Contraseña,
      Foto,
      Dirección,
      Email,
      Teléfono,
      DUI,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};

export const updateUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Nombre,
      Apellido,
      RolID,
      Contraseña,
      Foto,
      Dirección,
      Email,
      Teléfono,
      DUI,
    } = req.body;

    const [result] = await pool.query(
      'UPDATE usuarios SET Nombre = IFNULL(?,Nombre), Apellido = IFNULL(?,Apellido), RolID = IFNULL(?,RolID), Contraseña = IFNULL(?,Contraseña), Foto = IFNULL(?,Foto), Dirección = IFNULL(?,Dirección), Email= IFNULL(?,Email), Teléfono = IFNULL(?,Teléfono), DUI= IFNULL(?,DUI) WHERE UserID = ?',
      [
        Nombre,
        Apellido,
        RolID,
        Contraseña,
        Foto,
        Dirección,
        Email,
        Teléfono,
        DUI,
        id,
      ]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });

    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE UserID  = ?',
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

export const deleteUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE UserID = ?', [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal',
    });
  }
};
