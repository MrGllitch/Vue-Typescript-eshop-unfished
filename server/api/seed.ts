import { Category, Color } from "@prisma/client";
import prisma from "~/lib/prisma";

const categories: Category[] = [
	{ id: 1, nameCz: "Achát", nameEn: "Agate" },
	{ id: 2, nameCz: "Akvamarín", nameEn: "Aquamarine" },
	{ id: 3, nameCz: "Ametyst", nameEn: "Amethyst" },
	{ id: 4, nameCz: "Růžový křemen", nameEn: "Rose Quartz" },
	{ id: 5, nameCz: "Citrín", nameEn: "Citrine" },
	{ id: 6, nameCz: "Granát", nameEn: "Garnet" },
	{ id: 7, nameCz: "Malachit", nameEn: "Malachite" },
	{ id: 8, nameCz: "Opál", nameEn: "Opal" },
];

const colors: Color[] = [
	{ id: 1, name: "Raisin Black", color: "#1F122C" },
	{ id: 2, name: "Granite Gray", color: "#64516c" },
	{ id: 3, name: "Turkish Rose", color: "#a97180" },
	{ id: 4, name: "Pale Pink", color: "#f4d4d7" },
	{ id: 5, name: "Deep Champagne", color: "#edd09f" },
	{ id: 6, name: "Jet Stream", color: "#bfd1d2" },
	{ id: 7, name: "Myrtle Green", color: "#2b7379" },
	{ id: 8, name: "Alice Blue", color: "#f3fafb" },
	{ id: 9, name: "Russian Violet", color: "#3e1545" },
	{ id: 10, name: "Chinese Black", color: "#141218" },
	{ id: 11, name: "Gunmetal", color: "#293148" },
];

export default defineEventHandler(async (event) => {
	await prisma.category.createMany({
		data: categories,
	});
	await prisma.color.createMany({
		data: colors,
	});
});
