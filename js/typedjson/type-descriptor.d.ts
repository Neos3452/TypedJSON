export declare abstract class TypeDescriptor {
    readonly ctor: Function;
    protected constructor(ctor: Function);
    getTypes(): Function[];
}
export declare type Typelike = TypeDescriptor | Function;
export declare class ConcreteTypeDescriptor extends TypeDescriptor {
    constructor(ctor: Function);
}
export declare abstract class GenericTypeDescriptor extends TypeDescriptor {
    protected constructor(ctor: Function);
}
export declare class ArrayTypeDescriptor extends GenericTypeDescriptor {
    readonly elementType: TypeDescriptor;
    constructor(elementType: TypeDescriptor);
    getTypes(): Function[];
}
export declare function ArrayT(elementType: Typelike): ArrayTypeDescriptor;
export declare class SetTypeDescriptor extends GenericTypeDescriptor {
    readonly elementType: TypeDescriptor;
    constructor(elementType: TypeDescriptor);
    getTypes(): Function[];
}
export declare function SetT(elementType: Typelike): SetTypeDescriptor;
export declare class MapTypeDescriptor extends GenericTypeDescriptor {
    readonly keyType: TypeDescriptor;
    readonly valueType: TypeDescriptor;
    constructor(keyType: TypeDescriptor, valueType: TypeDescriptor);
    getTypes(): Function[];
}
export declare function MapT(keyType: Typelike, valueType: Typelike): MapTypeDescriptor;
export declare function isTypelike(type: any): type is Typelike;
export declare function ensureTypeDescriptor(type: Typelike): TypeDescriptor;
