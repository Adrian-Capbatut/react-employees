const { prisma } = require("../prisma/prisma-client");
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route  POST /api/user/Login
 * @desc Login
 * @access Public
 */

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Te rog, umpleti campurile obligatorii" });
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    const isPasswordCorrect =
        user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        });
    } else {
        return res
            .status(400)
            .json({ message: "Nu este corect loghin sau parola" });
    }
};

/**
 * @route POST/api/user/register
 * @desc inregistrare
 * @access Public
 */
const register = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res
            .status(400)
            .json({ message: "Te rog, umpleti campurile obligatorii" });
    }

    const registeredUser = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    if (registeredUser) {
        return res
            .status(400)
            .json({ message: "Utilizator, cu asa email deja este" });
    }

    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassord,
        },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
        res.status(201).json({
            is: user.id,
            email: user.email,
            name,
            token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        });
    } else {
        return res.status(400).json({ message: "Nu sa putut  crea utilizator" });
    }
};

/**
 *
 * @proute GET /api/user/current
 * @desc utilizatorul curent
 * @access Private
 */

const current = async (req, res) => {
    return res.status(200).json(req.user);
};

module.exports = {
    login,
    register,
    current,
};
