const dividirArray = (arr) => {
	var chunk = [],
		i; // declara array vacio e indice de for
	for (
		i = 0;
		i <= arr.length;
		i += 9 // loop que recorre el array
	)
		chunk.push(arr.slice(i, i + 9)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador

	return chunk;
};

module.exports = { dividirArray };