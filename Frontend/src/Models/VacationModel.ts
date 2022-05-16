class VacationModel {
    public vacationId: string;
    public destination: string;
    public description: string;
    public fromDate: string ;
    public toDate: string;
    public price: number;
    public image: FileList = null;
    public imageName: string;
    public isFollowed?: boolean;
    public amountOfFollowers?: number;

}

export default VacationModel;