export abstract class TypeDescriptor {
    protected constructor(public readonly ctor: Function) {}

    getTypes(): Function[] {
        return [this.ctor];
    }
}

export type Typelike = TypeDescriptor|Function;

export class ConcreteTypeDescriptor extends TypeDescriptor {
    constructor(ctor: Function) {
        super(ctor);
    }
}

export abstract class GenericTypeDescriptor extends TypeDescriptor {
    protected constructor(ctor: Function) {
        super(ctor);
    }
}

export class ArrayTypeDescriptor extends GenericTypeDescriptor {
    constructor(public readonly elementType: TypeDescriptor) {
        super(Array);
    }

    getTypes(): Function[] {
        return super.getTypes().concat(this.elementType.getTypes());
    }
}

export function ArrayT(elementType: Typelike): ArrayTypeDescriptor {
    return new ArrayTypeDescriptor(ensureTypeDescriptor(elementType));
}

export class SetTypeDescriptor extends GenericTypeDescriptor {
    constructor(public readonly elementType: TypeDescriptor) {
        super(Set);
    }

    getTypes(): Function[] {
        return super.getTypes().concat(this.elementType.getTypes());
    }
}

export function SetT(elementType: Typelike): SetTypeDescriptor {
    return new SetTypeDescriptor(ensureTypeDescriptor(elementType));
}

export class MapTypeDescriptor extends GenericTypeDescriptor {
    constructor(
        public readonly keyType: TypeDescriptor,
        public readonly valueType: TypeDescriptor,
    ) {
        super(Map);
    }

    getTypes(): Function[] {
        return super.getTypes().concat(this.keyType.getTypes(), this.valueType.getTypes());
    }
}

export function MapT(keyType: Typelike, valueType: Typelike): MapTypeDescriptor {
    return new MapTypeDescriptor(ensureTypeDescriptor(keyType), ensureTypeDescriptor(valueType));
}

// export class DictionaryTypeDescriptor extends GenericTypeDescriptor {
//     constructor(public readonly elementType: TypeDescriptor) {
//         super(Object);
//     }
//
//     getTypes(): Function[] {
//         return super.getTypes().concat(this.elementType.getTypes());
//     }
// }
//
// export function DictT(elementType: Typelike): DictionaryTypeDescriptor {
//     return new DictionaryTypeDescriptor(ensureTypeDescriptor(elementType));
// }

export function isTypelike(type: any): type is Typelike {
    return type && (typeof type === "function" || type instanceof TypeDescriptor);
}

export function ensureTypeDescriptor(type: Typelike): TypeDescriptor {
    return type instanceof TypeDescriptor ? type : new ConcreteTypeDescriptor(type);
}
