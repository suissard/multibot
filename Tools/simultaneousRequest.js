module.exports = (asyncFunctionArray, nrbSimultaneaous = 5) => {
    return new Promise((res) => {
        let done = 0;
        const finish = asyncFunctionArray.length;
        let request = async () => {
            if (asyncFunctionArray.length <= 0 && done >= finish) return res();
            if (asyncFunctionArray.length <= 0 && done < finish) return;
            try {
                await asyncFunctionArray.shift()();
            } catch (e) {
                console.error(e);
            }
            done++;
            return await request();
        };
        for (let i; nrbSimultaneaous > 0; nrbSimultaneaous--) request();
    });
};
