export class FiltersService {
  lowercase(value: string) {
    if (!value) return;
    return value.toLowerCase();
  }

  uppercase(value: string) {
    if (!value) return;
    return value.toUpperCase();
  }
}
