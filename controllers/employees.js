const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc primirea tuturor lucratorilor
 * @access Private
 */
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch {
        res.status(500).json({ message: "Nu puteti primi angajati " });
    }
};

/**
 * @route POST /api/employees/add
 * @desc adaugarea angajatului
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.adress || !data.age) {
            return res
                .status(400)
                .json({ message: "Toate campurile sunt obligatorii" });
        }

        // await prisma.user.update({
        //     where: {
        //         id: req.user.id
        //     },
        //     data: {
        //         createdEmployee: {
        //             create: data
        //         }
        //     }
        // })

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id,
            },
        });

        return res.status(201).json(employee);
    } catch {
        res.status(500).json({ message: "Ceva nu a mers bine" });
    }
};

/**
 *
 * @route POST /api/employees/remove/:id
 * @desc remove user
 * @acces Private
 */
const remove = async (req, res) => {
    const { id } = req.body;

    try {
        await prisma.employee.delete({
            where: {
                id,
            },
        });

        res.status(204).json('Efectuat')
    } catch {
        res.status(500).json({ message: "Stergerea utilizatorului esuata" });
    }
};

module.exports = {
    all,
    add,
};
