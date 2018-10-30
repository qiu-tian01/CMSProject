function getPath($obj) {
    const oFReader = new FileReader();
    const file = $obj.get(0).files[0];
    
    oFReader.readAsDataURL(file);
     oFReader.onloadend = function (oFRevent) {
        return  oFRevent.target.result;
    }
}

export default getPath