class CurdRepo {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');

            throw error;
        }
    }

    async getAll() {
        try {
            const tag = await this.model.findById({});
            return tag;
        } catch (error) {
            console.log('Something went wrong in repo (getAll)');
            throw error;
        }
    }


    async get(id) {
        try {
            const tag = await this.model.findById(id);
            return tag;
        } catch (error) {
            console.log('Something went wrong in repo (get)');
            throw error;
        }
    }

    async update(id, data, session=null) {
        try {
            const tag = await this.model.findByIdAndUpdate(id, data, { new: true, session  });
            return tag;
        } catch (error) {
            console.log('Something went wrong in repo (get)');
            throw error;
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (destory)');
            throw error;
        }
    }


}


module.exports=  CurdRepo;