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
        res.status(400).json({ message: 'Nu puteti primi angajati ' })
    }
};

module.exports = {
    all
}
