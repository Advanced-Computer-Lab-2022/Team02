const AdministratorDetails = ({ administrator }) => {
    return(
        <div className="administrator-details">
            <h4>{administrator.username}</h4>
            <p>{administrator.createdAt}</p>
        </div>
    )
}
export default AdministratorDetails