import { IndexedObject } from "./types";
import { OptionsBase } from "./options-base";
import { TypeDescriptor } from "./type-descriptor";
export interface IScopeTypeInfo {
    type: TypeDescriptor;
    knownTypes: Map<string, Function>;
}
export declare type TypeResolver = (sourceObject: Object, knownTypes: Map<string, Function>) => Function | undefined | null;
/**
 * Utility class, converts a simple/untyped javascript object-tree to a typed object-tree.
 * It is used after parsing a JSON-string.
 */
export declare class Deserializer<T> {
    options?: OptionsBase;
    private _typeResolver;
    private _nameResolver?;
    private _errorHandler;
    setNameResolver(nameResolverCallback: (ctor: Function) => string): void;
    setTypeResolver(typeResolverCallback: TypeResolver): void;
    setErrorHandler(errorHandlerCallback: (error: Error) => void): void;
    convertAsObject(sourceObject: IndexedObject, sourceObjectTypeInfo: IScopeTypeInfo, objectName?: string, memberOptions?: OptionsBase): {} | undefined;
    convertSingleValue(sourceObject: any, typeInfo: IScopeTypeInfo, memberName?: string, memberOptions?: OptionsBase): any;
    convertAsArray(sourceObject: any, typeInfo: IScopeTypeInfo, memberName?: string, memberOptions?: OptionsBase): any[];
    convertAsSet(sourceObject: any, typeInfo: IScopeTypeInfo, memberName?: string, memberOptions?: OptionsBase): Set<any>;
    convertAsMap(sourceObject: any, typeInfo: IScopeTypeInfo, memberName?: string, memberOptions?: OptionsBase, dictionaryShape?: boolean): Map<any, any>;
    private _convertAsFloatArray;
    private _convertAsUintArray;
    private _throwTypeMismatchError;
    private _makeTypeErrorMessage;
    private _instantiateType;
    private _mergeKnownTypes;
    private _createKnownTypesMap;
    private _stringToArrayBuffer;
    private _stringToDataView;
    private retrievePreserveNull;
}
