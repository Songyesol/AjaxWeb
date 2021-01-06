package common.board;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/getBoardSurvlet")
public class getBoardSurvlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public getBoardSurvlet() {
        super();
     
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		boardDAO dao1 = new boardDAO();
		List<boardVO> list= dao1.getBoardList();
		
		String xml = "<dataset>";
		for(boardVO board:list) {
			xml += "<record>";
			xml += "<No>"+board.getBoardNo()+"</No>"
					+ "<title>"+board.getTitle()+"</title>"
					+ "<content>"+board.getContent()+"</content>"
					+ "<writer>"+board.getWriter()+"</writer>"
					+ "<creationDate>"+board.getCreationDate()+"</creationDate>";
			xml += "</record>";
		}
			
		xml += "</dataset>";
		response.getWriter().append(xml);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
