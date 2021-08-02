// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.

let main = document.createElement("main")
main.innerHTML = ""
document.body.append(main)

class flickrApi {
    constructor(location) {
        this.location = location
        this.currentPhotoIndex = 0
        this.photos = []
        
        document.getElementById("next").addEventListener("click", this.displayNextImage.bind(this))
    }

    createUrl() {
        return "https://shrouded-mountain-15003.herokuapp.com/" +
        "https://flickr.com/services/rest/" + 
        "?api_key=94dfed461dbd31a6bb57a74630756fd6" +
        "&format=json" +
        "&nojsoncallback=1" +
        "&method=flickr.photos.search" +
        "&safe_search=1" +
        "&per_page=5" +
        "&lat=" + this.location.latitude +
        "&lon=" + this.location.longitude +
        "&text=landscape"
    }

    processResponse(response) {
        this.photos = response.photos.photo
        let imageUrl = response.photos.photo[0]
        this.displayImage(imageUrl)
        return this.photos
    }

    fetchRequestoFlickr() {
        let url = this.createUrl()
        fetch(url)
            .then(response => response.json())
            .then(results => this.processResponse(results))
    }

    constructImageURL(photoObj) {
            return "https://farm" + photoObj.farm +
                ".staticflickr.com/" + photoObj.server +
                 "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

    displayImage(photoObj) {
        
        let imgURL = this.constructImageURL(photoObj)
        let img = document.createElement("img")
        img.src = imgURL
        main.innerHTML = ""
        main.append(img)
    }

    displayNextImage() {
        if (this.currentPhotoIndex < 5) {
            this.currentPhotoIndex += 1
            
            if (this.currentPhotoIndex === 5) {
                this.currentPhotoIndex = 0 
            }
        }
        let object = this.photos[this.currentPhotoIndex]
        this.displayImage(object)
    }
}

function findingNoLocation() {
    const randomPlace = {latitude: "35.0116", longitude: "135.7681"}
    console.log(`We lost you! You must be at these coordinates: ${randomPlace}`)
    findPhotosFromLocation(randomPlace)
}

function foundUserLocation(position) {
    currentPlace = position.coords
    findPhotosFromLocation(currentPlace)
}

function findPhotosFromLocation(place) {
    let userLocation = new flickrApi(place)
    userLocation.fetchRequestoFlickr()
}

let currentPosition = navigator.geolocation.getCurrentPosition(foundUserLocation,findingNoLocation)