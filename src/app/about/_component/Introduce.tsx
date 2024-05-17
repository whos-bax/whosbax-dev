import styles from '../about.module.scss'

type Props = {
    title: string;
}

export default function Introduce({title}: Props) {
    return (
        <div className={styles.columnComponent}>
            <h4 className={styles.componentTitle}>
                {title.toUpperCase()}
            </h4>
            <div className={styles.componentBody}>
                <p>
                    끊임없는 새로운 도전과 발전을 추구하는 2년차 개발자입니다.
                </p>
                <p>
                    e-commerce, 헬스케어 스타트업에서 웹과 앱 서비스의 개발, 배포, 운영을 담당하였습니다. 프론트엔드 개발자가 본인 혼자임에도 불구하고 비즈니스 요구 사항을 충족하는 프로덕트를 만들기 위해 웹, 앱 구분
                    없이 업무를 수행하였습니다. 필요에 따라 중간 관리자 역할로써 개발 일정과 문서 관리를 담당했고, Back-End 기능 구현에 참여함으로써 문제해결에 앞장서 성공적인 프로젝트를
                    완료하는 것에 집중하였습니다. 창의적인 아이디어와 끈질긴 문제 해결 능력을 바탕으로, BEP 초과 달성 및 MAU 10만이라는 결과에 기여했습니다.
                </p>
                <p>
                    비즈니스가 성장하는 것에 최우선으로 기여하고 있습니다. 이에 발맞춰 개발을 적용하는 것을 이해하고 그 역량을 쌓기 위해 최선의 선택에 노력을 기울였습니다. 프로덕트의 품질을 항상
                    중요시하면서, 신속한 개발과 배포를 통해 유저의 반응과 경험에 기반하여 더 좋은 결과를 만들기 위해 끊임없이 노력하였습니다. 또한 다른 직무의 구성원들과의 소통과 협업을 통해 문제
                    해결을 바라보았고, 그 과정에서 주인의식을 가지고 업무를 수행하였습니다.
                </p>
            </div>
        </div>
    )
}
