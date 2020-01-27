describe("Test 1", () => {
    let sut;

    beforeEach(() => {
        sut = {};
    });

    it("should be true if true", () => {
        sut.a = false;
        sut.a = true;
        expect(sut.a).toBe(true);
    });
    it("Should work also", () => {
        sut.d = 7;
        sut.d += 1;
        expect(sut.d).toBe(8);
    });
});
