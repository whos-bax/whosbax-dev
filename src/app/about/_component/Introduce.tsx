import styles from '../about.module.scss'

type Props = {
    title: string;
}

const mock = '끊임없는 새로운 도전과 발전을 추구하는 개발자, 박상호입니다.\n' +
    '\n' +
    'e-commerce, 헬스케어, AI 서비스 스타트업에서 웹과 앱 서비스의 개발, 배포, 운영을 담당해왔습니다. 직무에 구애받지 않고 비즈니스 요구 사항을 충족하는 프로덕트와 성과를 창출하기 위해 웹, 앱, 마케팅 등 다양한 영역에서 업무를 수행했습니다. 필요에 따라 인력 및 일정, 문서 관리를 담당하는 중간 관리자의 역할을 수행하였고, 백엔드 기능 구현에도 적극적으로 참여하여 문제 해결을 통해 성공적인 프로젝트 완료에 기여했습니다.\n' +
    '\n' +
    '비즈니스의 성장을 최우선으로 고려하며, 이를 지원하는 개발을 적용하는 데 집중하고 있습니다. 신속한 개발과 배포를 통해 유저 피드백에 기반한 최적의 결과를 도출하는 데 중점을 두며, 항상 높은 품질의 프로덕트를 유지하려고 노력합니다. 또한, 다양한 직무의 구성원들과 원활하게 소통하며 협업을 통해 문제를 해결하고, 주인의식을 가지고 업무에 임하고 있습니다.'

export default function Introduce({title}: Props) {
    return (
        <div className={styles.columnComponent}>
            <h4 className={styles.componentTitle}>
                {title.toUpperCase()}
            </h4>
            <div className={styles.componentBody}>
                <p style={{
                    whiteSpace: 'pre-wrap',
                }}>{mock}</p>
            </div>
        </div>
    )
}
