import {
    IResourceEntity, IResourceEntityWithEmbedded,
    IResourceFactory
} from "../../../../interfaces/api";
import {TConstructor} from "../../../../types";
import {IEmbeddedTag} from "../../Tag";
import {IHasSaveEntity} from "../hasSave";
import {ICriteriaItem} from "../../common/CriteriaBuilder";


export type IRequiredEntity<T extends IResourceFactory<IResourceEntity<T>>> =
    IHasSaveEntity<T> &
    IResourceEntityWithEmbedded<T, IEmbeddedTag>;

export function hasEmbeddedSource
    <T extends IResourceFactory<IRequiredEntity<T>>>
(Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
    return class HasEmbeddedTags extends Base {
        constructor(factory: T) {
            super(factory);
            const item = new EmbeddedSourceCriteriaItem(this);
            this.criteriaBuilder.add(item);
        }
    };
}

export class EmbeddedSourceCriteriaItem<T extends IResourceFactory<IRequiredEntity<T>>>
    implements ICriteriaItem {
    protected entity: IRequiredEntity<T>;
    constructor(entity: IRequiredEntity<T>) {
        this.entity = entity;
    }
    getCreateCriteria(): object {
        return {};
    }

    getUpdateCriteria(): object {
        return {
            _embedded: {
                source: undefined
            }
        };
    }

}