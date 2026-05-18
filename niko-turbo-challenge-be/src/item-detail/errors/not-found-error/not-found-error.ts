export class NotFoundError extends Error {
    constructor() {
        super();

        this.message = 'PART_NOT_FOUND';
    }
}
