import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";

export interface IHasCreateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    create(options?: IRequestOptions): Promise<IHasCreateEntity<T>>;
}

export function hasCreate<T extends IHasCreateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasCreate extends Base {
        async create(options?: IRequestOptions) {
            const criteria = this.criteriaBuilder.getCreateCriteria();
            const factory = this.getFactory();
            const [first] = await factory.create([criteria], options);

            this.id = first.id;

            this.emit('create');
            return first;
        }
    };
}