export class Helper {
    static fileName(req, file, callback) {
        let customFile = file.originalname.split('.')[0];

        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
        
        let fileExt = '';
        if(file.mimetype.indexOf('jpeg') > -1) {
            fileExt = '.jpeg';
        } else if(file.mimetype.indexOf('png') > -1) {
            fileExt = '.png';
        } else if(file.mimetype.indexOf('gif') > -1) {
            fileExt = '.gif';
        }

        customFile = customFile + '_' + uniqueSuffix + fileExt;
        
        callback(null, customFile);
    }

    static fileDirectory(req, file, callback) {
        callback(null, './files/')
    }
}