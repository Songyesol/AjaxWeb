package common.board;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class boardDAO {
	private Connection conn = null;

	public boardDAO() {
		try {
			String user = "hr";
			String pw = "hr";
			String url = "jdbc:oracle:thin:@localhost:1521:xe";

			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = DriverManager.getConnection(url, user, pw);

			System.out.println("Database에 연결되었습니다.\n");

		} catch (ClassNotFoundException cnfe) {
			System.out.println("DB 드라이버 로딩 실패 :" + cnfe.toString());
		} catch (SQLException sqle) {
			System.out.println("DB 접속실패 : " + sqle.toString());
		} catch (Exception e) {
			System.out.println("Unkonwn error");
			e.printStackTrace();
		}
	}// 생성자 end
	
	public boolean insertBoard(boardVO vo ) {
		String sql = "insert into boards(board_no, title, content, writer, creation_date) "
				+ "values((select nvl(max(board_no),0)+1 from boards),?,?,?,sysdate)";
		int cnt = 0;
		try {
			
			PreparedStatement psmt = conn.prepareStatement(sql);
			psmt.setString(1, vo.getTitle());
			psmt.setString(2, vo.getContent());
			psmt.setString(3, vo.getWriter());
			cnt = psmt.executeUpdate();
			System.out.println(cnt + "건 입력되었습니다.");
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return cnt == 1 ? true:false;
	}
	
	public List<boardVO> getBoardList() {
		String sql = "select * from boards order by 1";
		List<boardVO> list = new ArrayList<>();
		
		try {
			PreparedStatement ps= conn.prepareStatement(sql);
			ResultSet rsrs = ps.executeQuery();
			
			while(rsrs.next()) {
				boardVO vo = new boardVO();
				vo.setBoardNo(rsrs.getInt("board_no"));
				vo.setTitle(rsrs.getString("title"));
				vo.setContent(rsrs.getString("content"));
				vo.setWriter(rsrs.getString("writer"));
				vo.setCreationDate(rsrs.getString("creation_date"));
				list.add(vo);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	} // end of boardList()
	
	public boolean deleteBoard(boardVO vo) {
		String sql = "delete from boards where board_no = ?";
		int r =0;
		try {
			PreparedStatement psmt = conn.prepareStatement(sql);
			psmt.setInt(1, vo.getBoardNo());
			
			r=psmt.executeUpdate();
			System.out.println(r+"건 삭제완료");
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return r==1?true:false;
		
	}//end of deleteBoard()
	
	public boolean updateBrd(boardVO vo) {
		int r = 0;
		String sql = "update boards set title = ?, content = ?, writer = ? where board_no = ?";
		try {
			PreparedStatement psmt = conn.prepareStatement(sql);
			psmt.setString(1, vo.getTitle());
			psmt.setString(2, vo.getContent());
			psmt.setString(3, vo.getWriter());
			psmt.setInt(4, vo.getBoardNo());
			
			r = psmt.executeUpdate();
			System.out.println(r+"건 수정됨");
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return r == 1 ? true : false;
		
	}
}
