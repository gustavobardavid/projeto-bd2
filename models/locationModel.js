class LocationModel {
    constructor() {
      this.locations = [
        { name: "Loja 1", lat: -6.88634, lon: -38.5614, description: "Loja principal em Cajazeiras" },
        { name: "Loja 2", lat: -6.7583, lon: -38.2344, description: "Filial em Sousa" },
      ];
    }
  
    getAllLocations() {
      return this.locations;
    }
  }
  
  export default new LocationModel();
  