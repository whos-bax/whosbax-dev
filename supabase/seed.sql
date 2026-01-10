-- Seed data for whosbax portfolio
-- Run this after creating the schema

-- =============================================
-- TIMELINE DATA
-- =============================================

-- 1. Blueprint (feat. whosbax) - 2025.12.23
INSERT INTO timeline (date, type, tag, title, artist, album, is_title, sort_order)
VALUES ('2025.12.23', 'featuring', 'Feat.', 'Blueprint (feat. whosbax)', 'MAKO, Soo!', 'SUDAKO', false, 1);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
VALUES ((SELECT id FROM timeline WHERE date = '2025.12.23' AND title = 'Blueprint (feat. whosbax)'), 2, 'Blueprint (feat. whosbax)', false, 1);

-- 2. 자리 (Where I've Been) EP - 2025.05.22
INSERT INTO timeline (date, type, tag, title, cover, sort_order)
VALUES ('2025.05.22', 'music', 'EP', '자리 (Where I''ve Been)', '/assets/images/albums/where-ive-been.jpg', 2);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 1, 'Now I Know', false, 1 FROM timeline WHERE date = '2025.05.22' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 2, '진심 (I meant it)', false, 2 FROM timeline WHERE date = '2025.05.22' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 3, 'Comedy', true, 3 FROM timeline WHERE date = '2025.05.22' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 4, '이르지 (Too Soon)', true, 4 FROM timeline WHERE date = '2025.05.22' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 5, 'I''m a fool', false, 5 FROM timeline WHERE date = '2025.05.22' AND type = 'music';

-- 3. 데이티움 Career - 2025.04.21
INSERT INTO timeline (date, type, tag, title, role, description, link, sort_order)
VALUES ('2025.04.21', 'career', 'Career', '데이티움', 'Software Developer', 'LLM 활용 블로그 콘텐츠 자동 생성 기능 개발, React Native 앱 리팩토링으로 렌더링 속도 30% 개선', 'https://www.linkedin.com/company/datium-corp/?originalSubdomain=kr', 3);

-- 4. 기도 (feat. whosbax) - 2024.08.14
INSERT INTO timeline (date, type, tag, title, artist, album, sort_order)
VALUES ('2024.08.14', 'featuring', 'Feat.', '기도 (feat. whosbax)', 'MAKO', 'makomentary', 4);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
VALUES ((SELECT id FROM timeline WHERE date = '2024.08.14' AND type = 'featuring'), 3, '기도 (feat. whosbax)', false, 1);

-- 5. 텐서큐브 Career - 2024.07.01
INSERT INTO timeline (date, type, tag, title, role, description, link, sort_order)
VALUES ('2024.07.01', 'career', 'Career', '텐서큐브', 'Software Developer', 'AI 데이터 라벨링 SaaS 개발, WebSocket 기반 대용량 파일 전송 최적화, Docker/Nginx MSA 구축 및 CI/CD 무중단 배포', 'https://tensorcube.net/', 5);

-- 6. Gap Year - 2024.04 ~ 06
INSERT INTO timeline (date, type, tag, title, description, sort_order)
VALUES ('2024.04 ~ 06', 'gap', 'Gap Year', '경력 휴식기', '정보처리기사 취득, 컨퍼런스 참가', 6);

-- 7. Aspiration EP - 2022.11.04
INSERT INTO timeline (date, type, tag, title, cover, sort_order)
VALUES ('2022.11.04', 'music', 'EP', 'Aspiration', '/assets/images/albums/aspiration.jpg', 7);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 1, 'Open', false, 1 FROM timeline WHERE date = '2022.11.04' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 2, '타협', false, 2 FROM timeline WHERE date = '2022.11.04' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 3, 'Let me up (feat. ONDO)', false, 3 FROM timeline WHERE date = '2022.11.04' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 4, 'Swing (feat. Hardii)', true, 4 FROM timeline WHERE date = '2022.11.04' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 5, '낭만고양이 (feat. kishy)', false, 5 FROM timeline WHERE date = '2022.11.04' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 6, '홀로 (feat. Godiflow)', true, 6 FROM timeline WHERE date = '2022.11.04' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 7, 'Already know (feat. MAKO)', false, 7 FROM timeline WHERE date = '2022.11.04' AND type = 'music';

-- 8. 하우투약 Career - 2022.08.24
INSERT INTO timeline (date, type, tag, title, role, description, link, sort_order)
VALUES ('2022.08.24', 'career', 'Career', '하우투약', 'Frontend Developer · PM', 'React→Next.js 마이그레이션으로 SEO 300%↑ 매출 10배↑, React Native 앱 개발, PM으로 MAU 10만·매출 23억 달성', 'https://howtoyak.com/', 8);

-- 9. I'm not alone Single - 2022.04.09
INSERT INTO timeline (date, type, tag, title, cover, sort_order)
VALUES ('2022.04.09', 'music', 'Single', 'I''m not alone', '/assets/images/albums/im-not-alone.jpg', 9);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 1, 'I''m not alone', true, 1 FROM timeline WHERE date = '2022.04.09' AND type = 'music';

-- 10. 푸른나무재단 Activity - 2022.04
INSERT INTO timeline (date, type, tag, title, sort_order)
VALUES ('2022.04', 'activity', 'Activity', '푸른나무재단 정기 기부 시작', 10);

-- 11. walk flow Featuring - 2022.01.18
INSERT INTO timeline (date, type, tag, title, artist, album, sort_order)
VALUES ('2022.01.18', 'featuring', 'Feat.', 'walk flow', 'Jiyoon Heo', 'walk flow', 11);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
VALUES ((SELECT id FROM timeline WHERE date = '2022.01.18' AND type = 'featuring'), 1, 'Do it (feat. whosbax, UMiN)', true, 1);
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
VALUES ((SELECT id FROM timeline WHERE date = '2022.01.18' AND type = 'featuring'), 4, '괜찮아 (feat. NØVA, whosbax)', false, 2);

-- 12. who am I ? EP - 2021.12.06
INSERT INTO timeline (date, type, tag, title, cover, sort_order)
VALUES ('2021.12.06', 'music', 'EP', 'who am I ?', '/assets/images/albums/who-am-i.jpg', 12);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 1, 'Moonlight', false, 1 FROM timeline WHERE date = '2021.12.06' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 2, 'Paradise', false, 2 FROM timeline WHERE date = '2021.12.06' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 3, 'With no Stop', false, 3 FROM timeline WHERE date = '2021.12.06' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 4, 'Goodbye (feat. DOPA)', true, 4 FROM timeline WHERE date = '2021.12.06' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 5, 'Don''t taste me (feat. 가우(GOW))', false, 5 FROM timeline WHERE date = '2021.12.06' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 6, 'Color', false, 6 FROM timeline WHERE date = '2021.12.06' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 7, 'Way out', false, 7 FROM timeline WHERE date = '2021.12.06' AND type = 'music';

-- 13. 세종 UNION Activity - 2021.05
INSERT INTO timeline (date, type, tag, title, sort_order)
VALUES ('2021.05', 'activity', 'Activity', '세종 UNION 창업캠프 최우수상', 13);

-- 14. Red Rose Single - 2020.10.05
INSERT INTO timeline (date, type, tag, title, cover, sort_order)
VALUES ('2020.10.05', 'music', 'Single', 'Red Rose', '/assets/images/albums/red-rose.jpg', 14);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 1, 'True (Prod. 9una)', false, 1 FROM timeline WHERE date = '2020.10.05' AND type = 'music';
INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 2, 'Another Sight (feat. kishy) (Prod. 9una)', true, 2 FROM timeline WHERE date = '2020.10.05' AND type = 'music';

-- 15. 잘난놈 Featuring - 2020.09.21
INSERT INTO timeline (date, type, tag, title, artist, album, sort_order)
VALUES ('2020.09.21', 'featuring', 'Feat.', '잘난놈 (feat. whosbax)', 'Hardii, inkL', 'BLUE HIDEOUT MADE', 15);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
VALUES ((SELECT id FROM timeline WHERE date = '2020.09.21' AND type = 'featuring'), 2, '잘난놈 (feat. whosbax)', false, 1);

-- 16. Aurora Caffeine Single - 2020.09.07
INSERT INTO timeline (date, type, tag, title, cover, sort_order)
VALUES ('2020.09.07', 'music', 'Single', 'Aurora Caffeine', '/assets/images/albums/aurora-caffeine.jpg', 16);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
SELECT id, 1, 'Aurora Caffeine (Prod. 9una)', true, 1 FROM timeline WHERE date = '2020.09.07' AND type = 'music';

-- 17. Purple Sunset Featuring - 2020.08
INSERT INTO timeline (date, type, tag, title, artist, album, is_title, sort_order)
VALUES ('2020.08', 'featuring', 'Feat.', 'Purple Sunset (feat. whosbax)', 'I.L.LAVINE', 'Purple Sunset', true, 17);

INSERT INTO timeline_tracks (timeline_id, track_num, name, is_title, sort_order)
VALUES ((SELECT id FROM timeline WHERE date = '2020.08' AND type = 'featuring'), 1, 'Purple Sunset (feat. whosbax)', true, 1);

-- =============================================
-- SKILLS DATA
-- =============================================
INSERT INTO skills (name, category, sort_order) VALUES ('JavaScript', 'Language', 1);
INSERT INTO skills (name, category, sort_order) VALUES ('TypeScript', 'Language', 2);
INSERT INTO skills (name, category, sort_order) VALUES ('React', 'Framework', 3);
INSERT INTO skills (name, category, sort_order) VALUES ('Next.js', 'Framework', 4);
INSERT INTO skills (name, category, sort_order) VALUES ('React Native', 'Framework', 5);
INSERT INTO skills (name, category, sort_order) VALUES ('Zustand', 'State Management', 6);
INSERT INTO skills (name, category, sort_order) VALUES ('React-query', 'State Management', 7);
INSERT INTO skills (name, category, sort_order) VALUES ('Jotai', 'State Management', 8);
INSERT INTO skills (name, category, sort_order) VALUES ('AsyncStorage', 'Storage', 9);
INSERT INTO skills (name, category, sort_order) VALUES ('Axios', 'Library', 10);
INSERT INTO skills (name, category, sort_order) VALUES ('scss', 'Styling', 11);
INSERT INTO skills (name, category, sort_order) VALUES ('Bootstrap', 'Styling', 12);
INSERT INTO skills (name, category, sort_order) VALUES ('Tailwind', 'Styling', 13);
INSERT INTO skills (name, category, sort_order) VALUES ('AntD', 'UI Library', 14);
INSERT INTO skills (name, category, sort_order) VALUES ('Material UI', 'UI Library', 15);
INSERT INTO skills (name, category, sort_order) VALUES ('GitHub', 'Tool', 16);
INSERT INTO skills (name, category, sort_order) VALUES ('IntelliJ', 'IDE', 17);
INSERT INTO skills (name, category, sort_order) VALUES ('WebStorm', 'IDE', 18);
INSERT INTO skills (name, category, sort_order) VALUES ('VSCode', 'IDE', 19);
INSERT INTO skills (name, category, sort_order) VALUES ('Cursor', 'IDE', 20);
INSERT INTO skills (name, category, sort_order) VALUES ('Nginx', 'Infrastructure', 21);
INSERT INTO skills (name, category, sort_order) VALUES ('AWS (EC2, S3, CloudFront 등)', 'Cloud', 22);
INSERT INTO skills (name, category, sort_order) VALUES ('Vultr', 'Cloud', 23);
INSERT INTO skills (name, category, sort_order) VALUES ('Google Analytics', 'Analytics', 24);
INSERT INTO skills (name, category, sort_order) VALUES ('Naver Search Advisor', 'SEO', 25);
INSERT INTO skills (name, category, sort_order) VALUES ('Google Search Console', 'SEO', 26);

-- =============================================
-- EXPERIENCE SUMMARY DATA
-- =============================================

-- 데이티움
INSERT INTO experience_summary (company_name, start_date, end_date, link, description, is_break_time, sort_order)
VALUES ('데이티움', '2025-04-21', NULL, 'https://www.datium.xyz/', 'AI 정비소 관리 시스템 서비스를 제공하는 스타트업', false, 1);

INSERT INTO experience_positions (summary_id, position, sort_order)
VALUES ((SELECT id FROM experience_summary WHERE company_name = '데이티움'), 'Software Developer (25.04 ~)', 1);

-- 텐서큐브
INSERT INTO experience_summary (company_name, start_date, end_date, link, description, is_break_time, sort_order)
VALUES ('텐서큐브', '2024-07-01', '2025-03-01', 'https://tensorcube.net/', 'AI 데이터 라벨링 및 스토리지 서비스를 제공하는 스타트업', false, 2);

INSERT INTO experience_positions (summary_id, position, sort_order)
VALUES ((SELECT id FROM experience_summary WHERE company_name = '텐서큐브'), 'Software Developer (24.07 ~ 25.03)', 1);

-- 갭이어
INSERT INTO experience_summary (company_name, start_date, end_date, link, description, is_break_time, sort_order)
VALUES ('갭이어', '2024-04-01', '2024-06-30', NULL, NULL, true, 3);

-- 하우투약
INSERT INTO experience_summary (company_name, start_date, end_date, link, description, is_break_time, sort_order)
VALUES ('하우투약', '2022-08-24', '2024-03-08', 'https://howtoyak.com/', '약사 인플루언서와 함께하는 영양제 플랫폼, <b>당신의 영양제</b> 서비스 스타트업', false, 4);

INSERT INTO experience_positions (summary_id, position, sort_order)
VALUES ((SELECT id FROM experience_summary WHERE company_name = '하우투약'), 'Frontend Developer (22.08 ~ 24.03)', 1);
INSERT INTO experience_positions (summary_id, position, sort_order)
VALUES ((SELECT id FROM experience_summary WHERE company_name = '하우투약'), 'PM (22.11 ~ 23.02)', 2);

INSERT INTO experience_position_tasks (position_id, task, sort_order)
VALUES ((SELECT id FROM experience_positions WHERE summary_id = (SELECT id FROM experience_summary WHERE company_name = '하우투약') AND position LIKE 'PM%'), 'MAU 10만 달성, 매출 23억 달성 및 연간 BEP 달성', 1);

-- =============================================
-- EXPERIENCE DETAIL DATA
-- =============================================

-- 데이티움 Detail
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('데이티움', '데이티움', '2025-04-21', NULL, '매출 증대를 위한 LLM 활용 기능 개발 및 웹/앱 UI/UX/성능 개선 및 운영', false, 1);

INSERT INTO experience_links (detail_id, label, url, sort_order)
VALUES ((SELECT id FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움'), '오토호스(AutoHOS)', 'https://autohos.imweb.me/', 1);

INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Nextjs', 1 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'React-Native', 2 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'TypeScript', 3 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Material UI', 4 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Recoil', 5 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Google Cloud Platform', 6 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'LLM 활용 홍보 기능 개발', 1 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- GPT, Claude API를 활용해 정비소별 맞춤형 블로그 콘텐츠 자동 생성 시스템 설계 및 개발', 2 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 기능 출시 후 1개월 내 첫 매출 발생, 월간 콘텐츠 생성량 100건 이상으로 확장 가능성 확인', 3 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '앱 UI/UX/성능 개선', 4 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 사용자 행동 로그 및 VOC 분석을 통해 핵심 니즈 도출, 우선순위 기능 기획 및 개발', 5 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- React Native 코드베이스 전면 리팩토링을 통해 렌더링 속도 30% 개선', 6 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 중복 컴포넌트 제거 및 공통 모듈화로 재사용률 향상, 유지보수 비용 감소', 7 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 모바일 최적화 디자인 시스템 재정비를 통해 Android/iOS 간 UI 일관성 확보 및 사용자 만족도 향상', 8 FROM experience_detail WHERE project_title = '데이티움' AND company_name = '데이티움';

-- 텐서큐브 Detail
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('텐서큐브', '텐서큐브', '2024-07-01', '2025-03-01', 'AI 데이터 라벨링 및 스토리지 서비스 스타트업에서 초기 프로젝트 설정부터 배포·운영까지 전 과정 기여', false, 2);

INSERT INTO experience_links (detail_id, label, url, sort_order)
VALUES ((SELECT id FROM experience_detail WHERE project_title = '텐서큐브'), '텐서큐브', 'https://www.tensorcube.net/', 1);
INSERT INTO experience_links (detail_id, label, url, sort_order)
VALUES ((SELECT id FROM experience_detail WHERE project_title = '텐서큐브'), '텐서큐브 (Saas)', 'https://app.tensorcube.net/', 2);

INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Nextjs', 1 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'TypeScript', 2 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Material UI', 3 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Jotai', 4 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'GitHub (GitHub Action)', 5 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Docker', 6 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Nginx', 7 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Vultr', 8 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'ncloud', 9 FROM experience_detail WHERE project_title = '텐서큐브';

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '클라우드 스토리지 및 데이터셋 관리 도구 개발', 1 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Next.js·TypeScript·Material UI 기반 UI/UX 설계 및 구현 개발', 2 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Jotai로 상태 관리 통일 및 MUI로 일관된 디자인 시스템 구축', 3 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'WebSocket 기반 업로드/다운로드 기능 도입', 4 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 실시간 파일 전송 최적화로 트래픽 비용 절감', 5 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Stream API 활용으로 서버 메모리 사용량 감소 및 대용량 파일 처리 성능 개선', 6 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'AI 라벨링 워크플로우 도구 개발', 7 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Canvas API & Onnx 모델 연동 라벨링 도구 개발', 8 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 데이터 라벨링 워크플로우에 AI 모델 추론 기능 추가', 9 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '서브도메인 분리 호스팅 및 MSA 도입', 10 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Vultr 단일 IP 환경에서 Nginx + Docker로 3개 서브도메인 컨테이너화 및 독립적인 상태 관리 설정', 11 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 서비스 간 의존성 최소화, 독립성 및 확장성 강화', 12 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'CI/CD & 무중단 배포', 13 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- GitHub Actions와 Blue/Green 배포 전략으로 배포 안정성 확보', 14 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '정부 사업 과제 참여', 15 FROM experience_detail WHERE project_title = '텐서큐브';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Unreal Engine 5 기반 라벨링용 영상/이미지 제작', 16 FROM experience_detail WHERE project_title = '텐서큐브';

-- 갭이어 Detail
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('갭이어', '경력 휴식기', '2024-04-01', '2024-06-01', '', true, 3);

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'Wanted 프리온보딩 프론트엔드 챌린지 (2024.05)', 1 FROM experience_detail WHERE project_title = '경력 휴식기';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '정보처리기사 자격증 취득 (한국산업인력공단) (2024.06)', 2 FROM experience_detail WHERE project_title = '경력 휴식기';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'EO 리얼밸리 컨퍼런스 참가 (2024.07)', 3 FROM experience_detail WHERE project_title = '경력 휴식기';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '프론트엔드 코리아 2024 컨퍼런스 참가 (2024.08)', 4 FROM experience_detail WHERE project_title = '경력 휴식기';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '요즘사 파인더스 클럽 2기 활동 (2024.06 ~ 2024.08)', 5 FROM experience_detail WHERE project_title = '경력 휴식기';

-- 하우투약 Details (multiple projects)

-- 당신의 영양제 (당영몰)
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('하우투약', '당신의 영양제 (당영몰)', '2022-08-24', '2024-03-08', '기존 AI 추천 웹/앱 서비스에서 커머스 플랫폼으로 전환하면서, 신규 서비스 개시 수준의 프로젝트 설정과 Next.js로의 마이그레이션 진행, 서비스 개발/배포/운영', false, 4);

INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '당영몰', 'https://www.dangyoung.com/', 1 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '당영투게더 오징어약사 (예시)', 'https://www.dangyoung.com/together/@ojing', 2 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';

INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'React', 1 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'JavaScript', 2 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Nextjs', 3 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'React-Bootstrap', 4 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'GitHub', 5 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'AWS (EC2, S3, CloudFront)', 6 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Spring Boot', 7 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'QueryDsl', 8 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '프로젝트 관리', 1 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 프로젝트 기획, 이슈, 일정 관리로 안정적인 서비스 운영', 2 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '기술 스택 전환 및 사용자 경험 최적화', 3 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- React -> Next.js 마이그레이션: SEO 가시성 300% 이상 증가, 매출 10배 증가 기여', 4 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Beausable 및 Google Analytics 주요 UX 지표 분석 및 개선을 통한 이탈율 50% 감소', 5 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'UI/UX 성능 개선', 6 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- AWS S3 + CloudFront CDN 적용: 이미지 로딩 속도 50% 단축, 이탈률 50%↓', 7 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Skeleton UI 및 로딩 컴포넌트 적용으로 사용자 체감 성능 대폭 개선', 8 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '결제 및 API 통합', 9 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- PortOne 결제 시스템 연동으로 안정적 결제 흐름 개발', 10 FROM experience_detail WHERE project_title = '당신의 영양제 (당영몰)';

-- 당신의 영양제 관리자 페이지
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('하우투약', '당신의 영양제 관리자 페이지', '2022-08-24', '2024-03-08', 'React,AntD 기반 백오피스 시스템 개선 프로젝트: 물류/CS/상품등록/정산 관리 기능 재설계 및 CI/CD 자동화 구축', false, 5);

INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '당신의 영양제 관리자 페이지 (PLUTUS)', 'https://admin.dangyoung.com/', 1 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';

INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'React', 1 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'JavaScript', 2 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'AntD', 3 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Redux', 4 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'GitHub', 5 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'AWS (EC2, S3, CloudFront)', 6 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Spring Boot', 7 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'QueryDsl', 8 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'CI/CD 배포 자동화 구축', 1 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- GitHub Actions로 빌드·배포 파이프라인 구현, 배포 시간 30% 단축', 2 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '운영 기능 개발 및 UX 강화', 3 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 내부 Editor 개발하여 CS 응답 시간 20% 단축', 4 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 사용자 피드백 반영 UI 개선으로 운영 편의성 향상', 5 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '전역 상태 관리 및 코드 품질 개선', 6 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Redux 아키텍처 재구성으로 상태 관리 이슈 80% 감소', 7 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- ESLint·Prettier 도입으로 코드 일관성 및 협업 효율 25% 상승', 8 FROM experience_detail WHERE project_title = '당신의 영양제 관리자 페이지';

-- 당영투게더
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('하우투약', '당영투게더', '2023-02-01', '2024-03-08', '사용자(인플루언서) 맞춤형 개인 페이지 제공 및 이를 관리할 수 있는 관리자 페이지 개발 및 운영', false, 6);

INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '당영투게더 / 관리자페이지', 'https://together.dangyoung.com/', 1 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '당영투게더 메디슨맨 약사 (예시)', 'https://together.dangyoung.com/together/channel?id=mediman', 2 FROM experience_detail WHERE project_title = '당영투게더';

INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'React', 1 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'JavaScript', 2 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'AntD', 3 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Redux', 4 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'GitHub', 5 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Git Action', 6 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'AWS (EC2, S3, CloudFront)', 7 FROM experience_detail WHERE project_title = '당영투게더';

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'UI/UX & 반응형 개발', 1 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- AntD 컴포넌트 커스터마이징으로 브랜드 일체감 유지', 2 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '데이터 시각화 및 CRUD 기능', 3 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Chart.js 도입해 매출·유입량 실시간 시각화 대시보드 구축', 4 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 카테고리,영양제,댓글 관리용 CRUD 기능 개발', 5 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'CI/CD 및 코드 품질 보장', 6 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- GitHub Actions로 빌드/배포 자동화, 배포 성공률 99% 확보', 7 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- ESLint, Prettier, Husky, lint-staged 도입하여 코드 표준화 적용', 8 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '도메인 관리 및 인프라 운영', 9 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 가비아를 통한 사용자별 커스텀 도메인 발급', 10 FROM experience_detail WHERE project_title = '당영투게더';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- AWS S3/CloudFront로 정적 자산 캐싱, 페이지 로드 평균 시간 1초 내외 달성', 11 FROM experience_detail WHERE project_title = '당영투게더';

-- 당신의 영양제 (앱)
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('하우투약', '당신의 영양제 (앱)', '2023-08-01', '2024-03-08', '인플루언서-구독자 소통을 위한 React Native 기반 폐쇄형 모바일 앱 서비스 개발 및 운영', false, 7);

INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '플레이스토어 (AOS)', 'https://play.google.com/store/apps/details?id=com.dangyounglonglifeapp&pli=1', 1 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '앱스토어 (iOS)', 'https://apps.apple.com/kr/app/%EB%8B%B9%EC%8B%A0%EC%9D%98-%EC%98%81%EC%96%91%EC%A0%9C-%EC%A0%84%EB%AC%B8%EA%B0%80%EB%93%A4%EC%9D%98-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EB%93%9C%EB%9F%AD%EC%8A%A4%ED%86%A0%EC%96%B4/id6462846633', 2 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';

INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'React Native', 1 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'JavaScript', 2 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'GitHub', 3 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'AWS(S3)', 4 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Android Studio', 5 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Xcode', 6 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '프로젝트 리딩', 1 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 기술 스택 선정 및 스프린트 계획 주도 → 2주 단위 릴리즈 안정화', 2 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'UI/UX 일관성 확보', 3 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Android, iOS 컴포넌트/디자인 통일 -> 사용자 만족도 설문 4.5/5.0 달성', 4 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- HTML 렌더링 컴포넌트 도입으로 웹 콘텐츠와 디자인 통일', 5 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '핵심 기능 개발', 6 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Foreground Service 기반 만보기 기능 설계/구현', 7 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 아토믹 디자인 패턴 적용으로 컴포넌트 재사용성 40% 향상', 8 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '빠른 배포 적용', 9 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- CodePush 연동으로 즉시 업데이트 반영', 10 FROM experience_detail WHERE project_title = '당신의 영양제 (앱)';

-- 당영파트너스 (앱)
INSERT INTO experience_detail (company_name, project_title, start_date, end_date, description, is_break_time, sort_order)
VALUES ('하우투약', '당영파트너스 (앱)', '2023-11-01', '2024-03-08', '당영투게더 관리자용 모바일 앱 개발 프로젝트: 운영 효율성 및 데이터 전달 최적화', false, 8);

INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '플레이스토어 (AOS)', 'https://play.google.com/store/apps/details?id=com.dangyoungtogetherapp', 1 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_links (detail_id, label, url, sort_order)
SELECT id, '앱스토어 (iOS)', 'https://apps.apple.com/us/app/%EB%8B%B9%EC%98%81%ED%8C%8C%ED%8A%B8%EB%84%88%EC%8A%A4/id6471548816', 2 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';

INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'React Native', 1 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'JavaScript', 2 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'GitHub', 3 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'AWS(S3)', 4 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Android Studio', 5 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_skills (detail_id, skill, sort_order)
SELECT id, 'Xcode', 6 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';

INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '프로젝트 리딩', 1 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 기술 스택 선정 및 스프린트 계획 주도 → 2주 단위 릴리즈 안정화', 2 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, 'UI/UX 일관성 확보', 3 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- Android, iOS 컴포넌트/디자인 통일', 4 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '기능 개발', 5 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 클라이언트 사이드 알림/데이터 동기화 기능 구현', 6 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- 사용자별 데이터 캐싱 전략 도입 → 네트워크 호출 25% 감소', 7 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '빠른 배포 적용', 8 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
INSERT INTO experience_summary_items (detail_id, item, sort_order)
SELECT id, '- CodePush 연동으로 즉시 업데이트 반영', 9 FROM experience_detail WHERE project_title = '당영파트너스 (앱)';
