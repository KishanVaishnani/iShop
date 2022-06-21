export function ConvertEnumToList(enumObject: any) {
    const arrayObjects = []
    for (const [propertyKey, propertyValue] of Object.entries(enumObject)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }
        arrayObjects.push({ id: propertyValue, name: propertyKey });
    }
    return arrayObjects;
}