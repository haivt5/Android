package se0965.vtth.com.android.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AbsListView;
import android.widget.AdapterView;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import se0965.vtth.com.android.R;
import se0965.vtth.com.android.adapter.ResultAdapter;
import se0965.vtth.com.android.common.core.OnTaskCompleted;
import se0965.vtth.com.android.dataloader.FoodsAsyncLoader;
import se0965.vtth.com.android.fragment.TabSearch;
import se0965.vtth.com.android.model.Food;

public class SearchResultActivity extends AppCompatActivity implements OnTaskCompleted {

    public static final String DATA_EXCHANGE_OBJECT = "food";
    ListView listView;
    ResultAdapter adapter;
    private List<Food> foods;
    private String textSearch;
    private int pageCount = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_result);
        checkSupportAndroidVersion();
        setTitle("");
        Intent intent = getIntent();
        // lấy ra Parameter từ Fragment
        textSearch = intent.getStringExtra(TabSearch.TEXT_SEARCH_EXTRA);

        executeData(textSearch, String.valueOf(0));

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setHomeButtonEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        listView = (ListView) findViewById(ResultAdapter.LAYOUT_RESOURCES_ID);
        listView.setOnScrollListener(onScrollListener());

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(SearchResultActivity.this, FoodDetailActivity.class);
                intent.putExtra(DATA_EXCHANGE_OBJECT, foods.get(position));
                startActivity(intent);
                overridePendingTransition(R.anim.pull_in_right, R.anim.push_out_left);
            }
        });

    }

    // tích hợp Option Menu vào Fragment
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    // tích hợp Option Menu vào Fragment
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }


    private void executeData(String key, String start) {
        String[] params = {key, start, "10"};
        FoodsAsyncLoader asy = new FoodsAsyncLoader(this, SearchResultActivity.this);
        asy.execute(params);
        pageCount++;
    }

    private AbsListView.OnScrollListener onScrollListener() {
        return new AbsListView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(AbsListView view, int scrollState) {
                int threshold = 1;
                int count = listView.getCount();

                if (scrollState == SCROLL_STATE_IDLE) {
                    if (listView.getLastVisiblePosition() >= count - threshold && pageCount < pageCount + 2) {
                        if (foods.size() >= 10 * pageCount) {
                            executeData(textSearch, String.valueOf(count + 1));
                            adapter.notifyDataSetChanged();
                        }

                    }
                }
            }

            @Override
            public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {

            }
        };
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.pull_in_left, R.anim.push_out_right);
    }

    private void checkSupportAndroidVersion() {
        int currentApiVersion = android.os.Build.VERSION.SDK_INT;
        if (currentApiVersion >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            Toolbar toolbar = (Toolbar) findViewById(R.id.activity_toolbar);
            setSupportActionBar(toolbar);
        }
    }

    @Override
    public void onTaskCompleted(Object list) {
        if (adapter == null) {
            if (list != null) {
                foods = (List<Food>) list;
            }
            else foods = new ArrayList<>();

            adapter = new ResultAdapter(getBaseContext(), foods);
            adapter.notifyDataSetChanged();

            listView.setAdapter(adapter);
        } else {
            foods.addAll((Collection<? extends Food>) list);
            adapter.notifyDataSetChanged();
        }
    }
}
