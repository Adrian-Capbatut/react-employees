import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom"

const Statuses: Record<string, string> = {
    created: 'Utilizator creat cu succes',
    update: 'Utilizator actualizat cu succes',
    deleted: 'Utilizator eliminat cu succes'
}

export const Status = () => {
const { status } = useParams();

  return (
    <Row align='middle' justify='center' style={{width: '100%'}}>
        <Result 
        status={ status ? 'success' : 404 }
        title={ status ? Statuses[status] : 'Nu sa gasit'}
        extra={
            <Button key="dashboard">
                <Link to='/'> Pagina principala </Link>
            </Button>
        }
        />
    </Row>
  )
}
