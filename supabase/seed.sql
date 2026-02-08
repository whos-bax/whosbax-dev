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
-- EXPERIENCE DATA
-- =============================================
-- Experience data is managed in code (src/features/experience/fallback-data.ts)
-- No seed data needed for experience tables
